type BackgroundButtonProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BackgroundButton: React.FC<BackgroundButtonProps> = ({ onChange }) => {
  return (
    <input
      type='file'
      accept='image/*'
      onChange={onChange}
      style={{ display: 'none' }}
      id='background-file-input'
    />
  )
}

export {
  BackgroundButton
}