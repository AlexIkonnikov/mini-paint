import { Button, Input } from 'antd'
import './styles.css'

const ToolBar = () => {
  return (
    <div className='toolbar'>
        <Button className='control-button control-button__brush' type='text'/>
        <Button className='control-button control-button__square' type='text'/>
        <Button className='control-button control-button__circle' type='text'/>
        <Button className='control-button control-button__straight' type='text'/>
        <Button className='control-button control-button__eraser' type='text'/>
        <Input style={{maxWidth: '100px'}} type={'color'} />
        <div className='toolbar__right-panel'>
            <Button className='control-button control-button__undo' type='text'/>
            <Button className='control-button control-button__redo' type='text'/>
            <Button className='control-button control-button__save' type='text'/>
        </div>
    </div>
  )
}

export default ToolBar