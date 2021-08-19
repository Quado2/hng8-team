import './RollText.scss'

function RollText(props){

    return(
        <div className='roll-text' disabled>
            {props.text.split('').map(letter => {
                return letter===' ' ? <h2 disabled>&nbsp;</h2> : <h2 disabled>{letter}</h2>
            })}
            
        </div>
    )
}

export default RollText