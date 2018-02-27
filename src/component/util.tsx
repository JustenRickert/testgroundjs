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

export const Row = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: row;
`

export const List = styled.ul`
`

export const ListItem = styled.li`
    padding: 5px;
    :hover { cursor: pointer; }
`
