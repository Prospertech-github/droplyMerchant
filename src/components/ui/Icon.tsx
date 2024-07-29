import { Icon, IconProps } from "@iconify/react";

type Props = IconProps;

const Icons = ({ icon, className, width, rotate, hFlip, vFlip }: Props) => {
  return (
    <>
      <Icon
        width={width}
        rotate={rotate}
        hFlip={hFlip}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icons;
