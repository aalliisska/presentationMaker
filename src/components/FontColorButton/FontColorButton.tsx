import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFontColor } from '../../store/redux/slideActionCreators'

const FontColorButton = () => {
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = event.target.value
    dispatch(changeFontColor(selectedColor))
  };

  return (
    <input
      type="color"
      onChange={handleChange}
      defaultValue="#000000"
    />
  );
};

export { FontColorButton }
