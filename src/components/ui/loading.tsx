import { cn } from './utils';
import { Glasses } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  variant?: 'glasses' | 'pulse' | 'dots';
}

// 眼镜加载动画 - 使用 Lucide 图标
function GlassesLoader({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="relative">
      {/* 背景光晕 */}
      <div className={cn(
        'absolute inset-0 rounded-full bg-blue-500/20 animate-ping',
        sizeClasses[size]
      )} />
      {/* 眼镜图标 */}
      <Glasses className={cn(
        'text-blue-600 animate-pulse relative z-10',
        sizeClasses[size]
      )} />
    </div>
  );
}

// 脉冲加载动画 - 圆环效果
function PulseLoader({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={cn('relative', sizeClasses[size])}>
      {/* 外圈 */}
      <div className="absolute inset-0 rounded-full border-4 border-blue-200" />
      {/* 旋转圈 */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
      {/* 中心点 */}
      <div className="absolute inset-[35%] rounded-full bg-blue-600 animate-pulse" />
    </div>
  );
}

// 点点加载动画
function DotsLoader({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn('flex items-center', sizeClasses[size])}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full bg-blue-500 animate-bounce',
            dotSizes[size]
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function Loading({
  size = 'md',
  text = '加载中',
  className,
  variant = 'glasses',
}: LoadingProps) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      {variant === 'glasses' && <GlassesLoader size={size} />}
      {variant === 'pulse' && <PulseLoader size={size} />}
      {variant === 'dots' && <DotsLoader size={size} />}
      
      {text && (
        <p className={cn('text-gray-500 animate-pulse', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

// 全屏加载遮罩
export function LoadingOverlay({
  text = '加载中',
  variant = 'glasses',
}: {
  text?: string;
  variant?: 'glasses' | 'pulse' | 'dots';
}) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Loading size="lg" text={text} variant={variant} />
    </div>
  );
}

// 内联加载（用于替换内容区域）
export function LoadingContent({
  text = '加载中',
  variant = 'glasses',
  className,
}: {
  text?: string;
  variant?: 'glasses' | 'pulse' | 'dots';
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center py-20', className)}>
      <Loading size="lg" text={text} variant={variant} />
    </div>
  );
}
