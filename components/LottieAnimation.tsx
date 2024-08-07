'use client'; // Indicate this is a Client Component

import {
  DotLottieReact,
  DotLottieReactProps,
} from '@lottiefiles/dotlottie-react';

// HOC component to use Lottie animations in server components
function LottieAnimation(props: DotLottieReactProps) {
  return (
    <DotLottieReact
      autoResizeCanvas={true}
      loop
      autoplay
      speed={0.75}
      {...props}
    />
  );
}

export default LottieAnimation;
