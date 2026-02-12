type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
