import type { ReactNode } from "react";

type GenericCardProps = {
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
};

export default function GenericCard({
  title,
  children,
  actions,
}: GenericCardProps) {
  return (
    <div className="card p-3 shadow-sm h-100">
      <h5>{title}</h5>

      <div className="mb-3">{children}</div>

      {actions && (
        <div className="d-flex gap-2 mt-auto flex-wrap">{actions}</div>
      )}
    </div>
  );
}