"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, checked, onCheckedChange, defaultChecked, ...props }, ref) => {
  // 追踪内部状态用于样式
  const [internalChecked, setInternalChecked] = React.useState(checked ?? defaultChecked ?? false);
  
  // 同步外部 checked 状态
  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);
  
  const handleCheckedChange = (newChecked: boolean) => {
    setInternalChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        backgroundColor: internalChecked ? '#3b82f6' : '#d1d5db',
      }}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0"
        )}
        style={{
          backgroundColor: '#ffffff',
          transform: internalChecked ? 'translateX(16px)' : 'translateX(0px)',
          transition: 'transform 150ms ease-in-out',
        }}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
