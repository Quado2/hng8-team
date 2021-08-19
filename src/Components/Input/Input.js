import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

import './Input.scss'
import {useState } from 'react'

function Input(props){

    const {list, prompt, name, inputType,
        handleInputChange, handleContinueClicked,
        focus, buttonDisabled, showContinueButton} = props

    const stacks = []
    const [showButton, setShowButton] = useState(false)
    const [status, setStatus] = useState('write')

    function handleCheckBoxChange(e){
        const {id, checked} = e.target
        const index = stacks.indexOf(id)

        if(checked){
            if(index === -1){
                stacks.push(id)
            }
        }
        else{
            if(index > -1){
                stacks.splice(index,1)
            }
        }

        }

        //I will handle the blur issue later

        function handleInputFocus(){
            setTimeout(()=>{
                setShowButton(true)
                setStatus('write')

            },200)
        }

        function handleBlur(){
            setTimeout(()=>{
                setShowButton(false)
                setStatus('good')
            },200)
           
        }

        return(
            <div className='our-input'>
                <label>{prompt}</label>
                <div className='inner-our-input'>
                    <div className='inner-level-2'>
                        {status==='good'? <span className='good'>✓</span>: null}
                            {status==='write'? <span className='write'><FontAwesomeIcon icon={faLongArrowAltRight} /></span>: null}
                        {status==='bad'? <span className='bad'>✕</span>:null}

                        { inputType === 'selectInput'?
                            <select onChange={handleInputChange} name={name}>
                                {list.split(',').map((item,i) => {
                                    return <option key={i} value ={item}>{item}</option>
                                })}
                            </select>
                            :
                            inputType ==='checkBox'?
                            <div className='checkbox-wrapper'>
                                {list.split(',').map((item,i)=>{
                                    return (
                                        <div className ='checkbox-item'>
                                            <input id={item} onChange={handleCheckBoxChange} type='checkbox' name = {name}/> <label>{item}</label>
                                        </div> 
                                    )
                                })}
                            
                                
                            </div>
                            :
                            <input onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                onBlur={handleBlur}
                                name={name} 
                                autoFocus={focus} 
                                type={inputType} />

                        }
                        
                    </div>
                    {(showButton || showContinueButton)?
                    <button disabled ={buttonDisabled}
                        onClick={(e) => handleContinueClicked(e,name,stacks)}
                        >
                        Continue
                    </button>
                    :
                    null
                    }
                
                </div>
            </div>
        )
}

export default Input