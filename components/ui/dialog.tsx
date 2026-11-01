import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * shadcn/ui Dialog (Radix primitive), used for image zoom previews.
 *
 * Centering uses a flex wrapper rather than `translate` utilities so it is not
 * affected by legacy transform overrides in index.css.
 */
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[2147483000] bg-slate-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[2147483001] flex items-center justify-center p-3 sm:p-6 focus:outline-none"
      {...props}
    >
      <div
        className={cn(
          "pointer-events-auto relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-2xl border border-white/10 bg-white p-3 shadow-2xl md:p-5",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close image preview"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogContent,
};
