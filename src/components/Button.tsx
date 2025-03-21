type PropsType = {
  title: string
  onClick: () => void
}

export const Button = ({ title, onClick }: PropsType) => {
  const onClickHandler = () => {
    onClick()
  }
  return <button onClick={onClickHandler}>{title}</button>
}
