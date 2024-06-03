import {HeaderBoxProps} from "@/types";

const HeaderBox = ({type = "title", title, subtext, user}: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[24px] leading-[30px] lg:text-[30px] lg:leading-[38px] font-semibold text-gray-900">
        {title}
      </h1>
      <p className="text-[14px] leading-[20px] lg:text-[16px] lg:leading-[24px] font-normal text-gray-600">
        {subtext}
        {type === 'greeting' && (
          <span className="text-primary">
          &nbsp;{user}
        </span>
        )}
      </p>
    </div>
  )
}

export default HeaderBox