import { useCallback, useEffect, useRef } from 'react';

type UseAutosaveOptions = {
  // While blurred, treat a new value as already saved and cancel any pending save.
  commitExternalValue?: boolean;
  delay?: number;
  onSave?: (value: string) => void;
  value: string;
};

export function useAutosave({
  commitExternalValue = false,
  delay = 1000,
  onSave,
  value,
}: UseAutosaveOptions) {
  const isFocusedRef = useRef(false);
  const onSaveRef = useRef(onSave);
  const savedValueRef = useRef(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  const clearScheduledSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const saveIfDirty = useCallback(() => {
    const currentValue = valueRef.current;
    if (currentValue === savedValueRef.current) {
      return;
    }
    savedValueRef.current = currentValue;
    onSaveRef.current?.(currentValue);
  }, []);

  const scheduleSave = useCallback(() => {
    clearScheduledSave();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      saveIfDirty();
    }, delay);
  }, [clearScheduledSave, delay, saveIfDirty]);

  useEffect(() => () => {
    clearScheduledSave();
    saveIfDirty();
  }, [clearScheduledSave, saveIfDirty]);

  useEffect(() => {
    valueRef.current = value;
    if (!commitExternalValue || isFocusedRef.current) {
      return;
    }
    clearScheduledSave();
    savedValueRef.current = value;
  }, [clearScheduledSave, commitExternalValue, value]);

  const adoptValue = useCallback((nextValue: string) => {
    savedValueRef.current = nextValue;
  }, []);

  const onBlur = useCallback(() => {
    isFocusedRef.current = false;
    clearScheduledSave();
    saveIfDirty();
  }, [clearScheduledSave, saveIfDirty]);

  const onChange = useCallback((nextValue: string) => {
    valueRef.current = nextValue;
    scheduleSave();
  }, [scheduleSave]);

  const onFocus = useCallback(() => {
    isFocusedRef.current = true;
  }, []);

  return {
    adoptValue,
    isFocusedRef,
    onBlur,
    onChange,
    onFocus,
  };
}

export default useAutosave;
