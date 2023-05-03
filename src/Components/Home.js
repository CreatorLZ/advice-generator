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

`
const Advicecard= styled.div`
background-color: hsl(217, 19%, 24%);
max-width:500px;
min-width: 300px;
min-height: 300px;
max-height: 500px;
border-radius: 10px;
display: flex;
align-items: center;
flex-direction: column;
position: relative;
padding: 20px;
margin: 20px;

`
const Advicenumber = styled.span`
margin-top: 50px;
color: hsl(150, 100%, 66%);
`

const Advicetext = styled(motion.h2)`
display: flex;
text-align: center;
margin-top: 20px;
font-size: 28px;
color:  hsl(193, 38%, 86%);
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
  box-shadow: 0 5px 15px rgba(170, 122, 182, .6);

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

   useEffect(() => {
    const intervalId = setInterval(() => {
      getAdvice();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [getAdvice])

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
    
    <img style={{position:"absolute", bottom:"55px",width:"80%",}} src='./images/pattern-divider-desktop.svg' alt='divider' />
    <Dice style={{
    position:"absolute",
    bottom:"-25px",  
    borderRadius:"50%"
 
    }}  onClick={getAdvice}  src='./images/icon-dice.svg' alt='dice' />
        </Advicecard>
    </Container>
  )
}

export default Home
