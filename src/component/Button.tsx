import * as React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

import {
  AnimatedButton,
  Button,
  Column,
  BigBox,
  Header,
  Paragraph,
  Section,
  SmallBox
} from './util'

type State = { count: number }
enum MutationType {
  Up = 'up',
  Down = 'down'
}

const state = observable<State>({ count: 0 })
const mutations = action((state: State) => (type: MutationType) => {
  switch (type) {
    case MutationType.Up:
      state.count++
      break
    case MutationType.Down:
      state.count--
      break
  }
})

export const ButtonDemo = (props: {
  state: State
  mutations: (state: State) => (type: MutationType) => void
}) => {
  const { state, mutations } = props
  return (
    <BigBox>
      <Section>
        <Column>
          <HeaderParagraph state={state} />
          <ButtonBox state={state} mutations={mutations} />
        </Column>
      </Section>
    </BigBox>
  )
}

const HeaderParagraph = observer((props: { state: State }) => (
  <>
    <Header>{'There should be a button somewhere around here.'}</Header>
    <Paragraph>
      {`Styled Components can be made just like this. Here's one that has a counter: ${
        state.count
      }`}
    </Paragraph>
  </>
))

const ButtonBox = (props: {
  state: State
  mutations: (state: State) => (type: MutationType) => void
}) => (
  <SmallBox>
    <Button onClick={() => props.mutations(state)(MutationType.Up)}>
      {'Up'}
    </Button>
    <AnimatedButton onClick={() => props.mutations(state)(MutationType.Down)}>
      {'Down'}
    </AnimatedButton>
  </SmallBox>
)

export default () => <ButtonDemo state={state} mutations={mutations} />
