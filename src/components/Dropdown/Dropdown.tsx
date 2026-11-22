import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Dropdown.css';

export type DropdownAutoClose = boolean | 'inside' | 'outside';

export interface DropdownPopperConfig {
  modifiers?: Array<{
    enabled?: boolean;
    name: string;
    options?: {
      offset?: [number, number];
    };
  }>;
}

export interface DropdownProps {
  autoClose?: DropdownAutoClose;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onToggle?: (nextShow: boolean) => void;
  show?: boolean;
  style?: React.CSSProperties;
}

interface DropdownContextValue {
  autoClose: DropdownAutoClose;
  isOpen: boolean;
  menuId: string;
  setOpen: (next: boolean) => void;
  toggleRef: React.RefObject<HTMLElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown.Toggle, Dropdown.Menu, and Dropdown.Item must be used inside Dropdown');
  }
  return context;
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) {
    return;
  }
  if (typeof ref === 'function') {
    ref(value);
  } else {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

function closesOn(autoClose: DropdownAutoClose, source: 'inside' | 'outside') {
  if (autoClose === false) {
    return false;
  }
  if (autoClose === true) {
    return true;
  }
  return autoClose === source;
}

function menuOffset(popperConfig?: DropdownPopperConfig) {
  const offset = popperConfig?.modifiers?.find(modifier => modifier.name === 'offset')?.options?.offset;
  return offset ? offset[1] : 2;
}

const DropdownRoot = React.forwardRef<HTMLDivElement, DropdownProps>(({
  autoClose = true,
  children,
  className = '',
  id,
  onToggle,
  show,
  style,
}, ref) => {
  const theme = useTheme();
  const isControlled = show !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = isControlled ? Boolean(show) : uncontrolledOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLElement | null>(null);
  const menuId = useId();
  const onToggleRef = useRef(onToggle);

  useEffect(() => {
    onToggleRef.current = onToggle;
  }, [onToggle]);

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onToggleRef.current?.(next);
  }, [isControlled]);

  useClickOutside(rootRef, () => {
    if (isOpen && closesOn(autoClose, 'outside')) {
      setOpen(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setOpen]);

  const setRootRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    assignRef(ref, node);
  };

  return (
    <DropdownContext.Provider
      value={{
        autoClose,
        isOpen,
        menuId,
        setOpen,
        toggleRef,
      }}
    >
      <div
        className={classNames({
          dropdown: true,
          'fikasio-dropdown': true,
          'fikasio-dropdown-open': isOpen,
          'fikasio-theme-dark': theme === 'dark',
          'fikasio-theme-light': theme === 'light',
          ...convertClassNameToObj(className),
        })}
        id={id}
        ref={setRootRef}
        style={style}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

DropdownRoot.displayName = 'Dropdown';

type DropdownToggleProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  onClick?: (event: React.SyntheticEvent) => void;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'onClick'>;

function DropdownToggle<T extends React.ElementType = 'button'>({
  as,
  children,
  className,
  onClick,
  ...rest
}: DropdownToggleProps<T>) {
  const {
    isOpen,
    menuId,
    setOpen,
    toggleRef,
  } = useDropdownContext();
  const Component = (as ?? 'button') as React.ElementType;

  const handleClick = (event: React.SyntheticEvent) => {
    onClick?.(event);
    setOpen(!isOpen);
  };

  return (
    <Component
      {...(as ? {} : { type: 'button' })}
      {...rest}
      aria-controls={menuId}
      aria-expanded={isOpen}
      className={classNames(
        'dropdown-toggle',
        'fikasio-dropdown-toggle',
        !as && 'fikasio-dropdown-toggle-caret',
        className,
      )}
      onClick={handleClick}
      ref={(node: HTMLElement | null) => {
        toggleRef.current = node;
      }}
    >
      {children}
    </Component>
  );
}

DropdownToggle.displayName = 'DropdownToggle';

interface MenuPlacement {
  end: boolean;
  top: boolean;
}

export interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  popperConfig?: DropdownPopperConfig;
}

function DropdownMenu({
  children,
  className,
  popperConfig,
  style,
  ...rest
}: DropdownMenuProps) {
  const { isOpen, menuId, toggleRef } = useDropdownContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<MenuPlacement>({ end: false, top: false });
  const [hasShown, setHasShown] = useState(isOpen);
  const offset = menuOffset(popperConfig);

  if (isOpen && !hasShown) {
    setHasShown(true);
  }

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    if (!menu || !toggle) {
      return undefined;
    }

    const place = () => {
      const toggleRect = toggle.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const spaceBelow = window.innerHeight - toggleRect.bottom - offset;
      const next = {
        end: toggleRect.left + menuRect.width > window.innerWidth - 8,
        top: menuRect.height > spaceBelow && toggleRect.top - offset > spaceBelow,
      };
      setPlacement(current => (
        current.end === next.end && current.top === next.top ? current : next
      ));
    };

    place();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(place);
    observer?.observe(menu);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [isOpen, offset, toggleRef]);

  if (!hasShown) {
    return null;
  }

  return (
    <div
      {...rest}
      className={classNames(
        'dropdown-menu',
        'fikasio-dropdown-menu',
        {
          'dropdown-menu-end': placement.end,
          'fikasio-dropdown-menu-end': placement.end,
          'fikasio-dropdown-menu-top': placement.top,
          show: isOpen,
        },
        className,
      )}
      hidden={!isOpen}
      id={menuId}
      ref={menuRef}
      style={{
        ...style,
        '--fikasio-dropdown-offset': `${offset}px`,
        position: 'absolute',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

DropdownMenu.displayName = 'DropdownMenu';

export interface DropdownItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  active?: boolean;
  eventKey?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(({
  active = false,
  children,
  className,
  disabled = false,
  eventKey,
  onClick,
  ...rest
}, ref) => {
  const { autoClose, setOpen } = useDropdownContext();

  return (
    <button
      {...rest}
      className={classNames(
        'dropdown-item',
        'fikasio-dropdown-item',
        {
          active,
          'fikasio-dropdown-item-active': active,
        },
        className,
      )}
      data-event-key={eventKey}
      disabled={disabled}
      onClick={event => {
        onClick?.(event);
        if (closesOn(autoClose, 'inside')) {
          setOpen(false);
        }
      }}
      ref={ref}
      type="button"
    >
      {children}
    </button>
  );
});

DropdownItem.displayName = 'DropdownItem';

const Dropdown = Object.assign(DropdownRoot, {
  Item: DropdownItem,
  Menu: DropdownMenu,
  Toggle: DropdownToggle,
});

export default Dropdown;
