import { useEffect, useState } from 'react'

import './TeamForm.scss'
import OurParticles  from '../../Components/Particles/Particles'
import RollText from '../../Components/RollText/RollText'
import Input from '../../Components/Input/Input';
import Notification from '../../Components/Notification/Notification'
import Backdrop from '../../Components/Backdrop/Backdrop'
function TeamForm() {
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [track, setTrack] = useState('Front End')
    const [stacks, setStacks] = useState([])
    const [gender, setGender] = useState('Male')

    const [showEmail, setShowEmail] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [showTrack, setShowTrack] = useState(false)
    const [showStacks, setShowStacks] = useState(false)
    const [showGender, setShowGender] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false)
    const [showNotification, setShowNotification] = useState(false)

    
    const [showTrackContinue, setShowTrackContinue] = useState(false)
    const [showStacksContinue, setShowStacksContinue] = useState(false)
    const [showGenderContinue, setShowGenderContinue] = useState(false)


    const [nameFocus, setNameFocus] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [phoneFocus, setPhoneFocus] = useState(false);
    





  useEffect( () => {

    const timer = setTimeout(() => {
      setShowSecond(true);
      setTimeout(()=>{
        setShowThird(true)
        setTimeout(()=>{
            setNameFocus(true)
            setShowName(true)
            
        },1000)
      },1500)
        }, 2000);
        return () => clearTimeout(timer)
    }, [])



  function handleInputChange(e){
      const {name, value} = e.target
      
      switch(name){
        case 'email':
              {
                  setEmail(value)
                  break;
              }
        case 'name':
                {
                    setName(value)
                    break;
                }
        case 'gender':
            {
                setGender(value)
                break;
            }
        case 'phone':
            {
                setPhone(value)
                break;
            }
        case 'track':
            {
                setTrack(value)
                break;
            }
        
        default : console.log('we lost this man')

      }


  }

  function turnOffAllShowButton(){

      setShowGenderContinue(false)
      setShowStacksContinue(false)
      setShowTrackContinue(false)
  }

   
  const handleContinueClicked = (e,name, stacks) =>{
    e.preventDefault();
    switch(name){

        case 'name':{
            setEmailFocus(true)
            setShowEmail(true)
            break;
        }

        case 'email':{
            setPhoneFocus(true)
            setShowPhone(true)
            break;
        }

        case 'phone':{
            setShowGender(true)
            turnOffAllShowButton()
            setShowGenderContinue(true)
            break;
        }
        case 'gender':{
            setShowTrack(true)
            turnOffAllShowButton()
            setShowTrackContinue(true)
            break;
        }

        case 'track':{
            setShowStacks(true)
            turnOffAllShowButton()
            setShowStacksContinue(true)
            break;
        }

        case 'stack':{
            setStacks(stacks)
            setShowSubmit(true)
            turnOffAllShowButton()
            break;
        }

        default: console.log('can not match the actual button pressed')
    }
  }



  function handleFormSubmitted(e){
      e.preventDefault();
      console.log("The details has been obtained and can now be submitted")
      console.log("Here are the details obatainer")
      console.log(`Name: ${name} \n Email: ${email} \nPhone: ${phone}`)
      console.log(`Gender: ${gender} \n Track: ${track} \nStacks: ${stacks}`)
      setShowNotification(true)
  }

  function handleOkClicked(){
      setShowNotification(false)
      document.location.reload()
  }

    return (
        <div className='team-form-wrapper'>
            <OurParticles />
            <Backdrop show={showNotification}/>
            {showNotification? 
                <Notification
                handleOkClicked={handleOkClicked}
                title='Application Received'
                message ={`Your Application to join us has been received ${name}, Sit back and drink water, You'll be contacted soon`}
             />
             :
             null
            }
            <form onSubmit ={handleFormSubmitted} >
                <div className='form-top-text' disabled>
                    {showSecond? 
                        <RollText text="Welcome to team Cruisetopia!" />
                        :
                        <div className='ticking'></div>
                        } 
                    {showThird? <RollText text="Let's get started" />: null}
                </div>
                {showName? 
                    <Input  inputType='text'
                        prompt='Enter you name:' 
                        name='name'
                        focus={nameFocus}
                        buttonDisabled={false}
                        handleInputChange={handleInputChange}
                        handleContinueClicked={handleContinueClicked}
                        />
                    :
                    null
                }
                {showEmail? 
                    <Input handleInputChange={handleInputChange} inputType='email'
                        prompt='Enter your email:' 
                        name='email' 
                        focus={emailFocus}
                        handleContinueClicked={handleContinueClicked}
                    />
                    :
                    null
                } 

                {showPhone? 
                    <Input handleInputChange={handleInputChange} inputType='text'
                        prompt='Enter your phone Number:' 
                        name='phone'
                        focus={phoneFocus}
                        handleContinueClicked={handleContinueClicked}
                        />
                        :
                        null
                    } 
                {showGender?
                    <Input handleInputChange={handleInputChange} inputType='selectInput'
                        prompt='Select your gender'
                        name='gender' 
                        list={'Male,Female'}
                        showContinueButton={showGenderContinue}
                        handleContinueClicked={handleContinueClicked}
                        />
                     :
                     null
                     }
                {showTrack?
                    <Input handleInputChange={handleInputChange} inputType='selectInput'
                        prompt='Select your track'
                        name='track'
                        handleContinueClicked={handleContinueClicked}
                        list={'Front End, Back end,Mobile track, DevOps, UI/UX, Entrepreneurship'}
                        showContinueButton={showTrackContinue}
                        />
                     :
                    null
                    }
                {showStacks?
                    <Input inputType='checkBox' 
                        prompt='Select the skills you are proficient in:'
                        name='stack'
                        showContinueButton={showStacksContinue}
                        handleContinueClicked={handleContinueClicked}
                        list='HTML, CSS, Bootstrap, Node-Js, React, Vue, Go, Laravel,Pyton, Springboot, mysql, Postgres, MongoDb'
                        />
                    :
                    null
                    }
                {showSubmit ? 
                    <input className='submit' type='submit' value='Submit Application'/>
                    :
                    null
                }
            </form>

            <div className='team-form-bottom'>
                <p>
                    By joining our team, you agree to be of good behaviour. Your mental is health important, but our deadlines are even more crucial. So, define a fine line between this program and your sanity, and stick to your priorities.
                </p>
            </div>
        </div>
    )
}

export default TeamForm