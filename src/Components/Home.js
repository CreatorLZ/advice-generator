import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled(motion.main)`
background-color: hsl(218, 23%, 16%);
width: 100%;
height:100vh;
display: flex;
align-items: center;
justify-content: center;
color: white;
flex-direction: column;
`
const Advicecard= styled.div`
background-color: hsl(217, 19%, 24%);
max-width:500px;
min-width: 300px;
min-height: 300px;
max-height: 600px;
border-radius: 15px;
display: flex;
align-items: center;
flex-direction: column;
position: relative;
padding: 20px;
margin: 20px;
transition: all 1.5s ease-in-out;

:hover{
  box-shadow: 0px 0px 27px 0px hsl(150, 100%, 66%);
}
`
const Advicenumber = styled.span`
margin-top: 50px;
color: hsl(150, 100%, 66%);
font-size: 12px;
letter-spacing: 2px;
`

const Advicetext = styled(motion.h2)`
display: flex;
text-align: center;
margin-top: 20px;
font-size: 28px;
color:  hsl(193, 38%, 86%);
margin:20px;

`
// const Hr = styled.hr`
// width: 100%;
// margin-top: 30px;
// `

const Dice = styled.img`
background-color: hsl(150, 100%, 66%);
padding: 15px;
:hover{
    cursor: pointer;
    background-color:  hsl(152, 120%, 70%, 1);
   box-shadow: 0px 0px 27px 0px hsl(150, 100%, 66%);

}
`

const Home = () => {
  const [quote, setQuote] = useState()
  const [quoteNo, setQuoteNo] = useState()

  const getAdvice = useCallback( async () =>{
    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      console.log(res.data.slip.id);
      setQuote(res.data.slip.advice)
      setQuoteNo(res.data.slip.id)
    }catch(err){

    }
  },[])

  useEffect(()=>{
   
    getAdvice();
  })

  const quoteAnimate = {
    offscreen:{ scale:1,opacity:0 },
    onscreen:{
      scale:1.1,
      opacity: 1,
      
      transition:{
        type:"spring",
        bounce:0.9,
       duration:8.5,
       repeat:Infinity
      }
    },
  }

  const pAnimate = {
    offscreen:{y:100,opacity:0},
    onscreen:{ y:0,
      opacity: 1,
      transition:{
        type:"spring",
        bounce:0.5,
        duration:1.5,
       
      }
    },
  }

  
  return (
    <Container
    initial={"offscreen"}
    whileInView={"onscreen"}
    viewport={{once:false}}
    transition={{staggerChildren:0.2}}
   >
        <Advicecard>
    <Advicenumber>
  ADVICE # {quoteNo}
    </Advicenumber>
    <Advicetext
    variants={quoteAnimate}>
    "{quote}"
    </Advicetext>
    
    <img style={{marginTop:"40px",marginBottom:"30px",width:"80%",}} src='./images/pattern-divider-desktop.svg' alt='divider' />
    <Dice style={{
    position:"absolute",
    bottom:"-25px",  
    borderRadius:"50%"
 
    }}  onClick={getAdvice}  src='./images/icon-dice.svg' alt='dice' />
        </Advicecard>
        <motion.span variants={pAnimate} style={{color:"hsl(150, 100%, 66%)", marginTop:"50px", fontWeight:"800", fontSize:"10px"}}>By CreatorLZ</motion.span>
    </Container>
  )
}

export default Home
