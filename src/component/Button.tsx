import * as React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { Column, BigBox, Header, Paragraph, Section, SmallBox } from './util'

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

type State = { count: number }
enum MutationType {
    Up = 'up',
    Down = 'down',
}

const state = observable<State>({ count: 0 })
const mutations = action((st: State) => (type: MutationType) => {
    switch (type) {
        case MutationType.Up:
            st.count++
            break
        case MutationType.Down:
            st.count--
            break
    }
})

const HeaderParagraph = observer((props: { state: State }) => (
    <>
        <Header>{'There should be a button somewhere around here.'}</Header>
        <Paragraph>
            {`Styled Components can be made just like this. Here's one that has a counter: ${state.count}`}
        </Paragraph>
    </>
))

const ButtonBox = (props: { state: State; mutations: (state: State) => (type: MutationType) => void }) => (
    <SmallBox>
        <Button onClick={() => props.mutations(state)(MutationType.Up)}>{'Up'}</Button>
        <AnimatedButton onClick={() => props.mutations(state)(MutationType.Down)}>{'Down'}</AnimatedButton>
    </SmallBox>
)

const ButtonDemo = (props: { state: State; mutations: (state: State) => (type: MutationType) => void }) => (
    <BigBox>
        <Section>
            <Column>
                <HeaderParagraph state={props.state} />
                <ButtonBox state={props.state} mutations={props.mutations} />
            </Column>
        </Section>
    </BigBox>
)

export default () => <ButtonDemo state={state} mutations={mutations} />
