type PropsType = {
  title: string
  onClick: () => void
  className?: string
}

export const Button = ({ title, onClick, className }: PropsType) => {
  const onClickHandler = () => {
    onClick()
  }
  return (
    <button className={className} onClick={onClickHandler}>
      {title}
    </button>
  )
}
