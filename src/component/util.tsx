import styled from 'styled-components'

export const BigBox = styled.div`
  display: flex;
  text-align: left;
  margin: 2em;
`

export const SmallBox = styled.div`
  display: flex;
  margin: auto;
`

export const Button = styled.button`
  background-color: palevioletred;
  border: 2px solid darkgray;
  color: papayawhip;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`

export const AnimatedButton = Button.extend`
  transition: 0.75s;
  :hover {
    color: palevioletred;
    background-color: white;
  }
`

export const Header = styled.h1`
  font-size 1.5em;
  text-align: left;
  color: palevioletred;
`

export const Section = styled.section`
  display: flex;
  padding: 4em;
  background: papayawhip;
  border: 2px solid darkgray;
`

export const Paragraph = styled.p`
  font-size: 1em;
  color: black;
`

export const Column = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
`
