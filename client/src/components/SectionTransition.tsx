interface SectionTransitionProps {
  fromColor: string;
  toColor: string;
  height?: string;
}

export default function SectionTransition({ 
  fromColor, 
  toColor, 
  height = "h-16" 
}: SectionTransitionProps) {
  return (
    <div 
      className={`w-full ${height}`}
      style={{
        background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`
      }}
    />
  );
}
