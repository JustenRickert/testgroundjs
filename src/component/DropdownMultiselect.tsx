import * as React from 'react'
import { includes } from 'lodash'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { BigBox, Section, Row, List, ListItem } from './util'

const labelMargin = 5
const dropdownHeight = 35

const Dropdown = styled.div`
    position: relative;
    display: flex;
`

const Label = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    margin: ${labelMargin}px;
    :hover {
        cursor: pointer;
    }
`

const DropdownContent = styled.div`
    display: ${props => props.theme.display};
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    margin-top: ${dropdownHeight + 2 * labelMargin}px;
`

const DropdownContentLabel = Label.extend`
    padding: 5px;
    background: tomato;
    transition: transform 0.5s;
    :hover {
        transform: rotate(180deg);
        background-color: papayawhip;
    }
`

type Item = { value: string; key: number }
type State = { items: Item[]; selectedItems: Item[]; isShowing: boolean }
enum MutationType {
    Show = 'show',
    Hide = 'hide',
    Select = 'select',
}

const state = observable({
    items: [
        { key: 1, value: 'item one' } as Item,
        { key: 2, value: 'item two' } as Item,
        { key: 3, value: 'item three' } as Item,
    ],
    selectedItems: new Array<Item>(),
    isShowing: false,
})
const mutations = action((st: State) => (type: MutationType) => {
    switch (type) {
        case MutationType.Show:
            state.isShowing = true
            break
        case MutationType.Hide:
            state.isShowing = false
            break
        case MutationType.Select:
            return (selectedItem: Item) => {
                if (includes(state.items, selectedItem)) {
                    state.items = state.items
                        .filter(item => item.key !== selectedItem.key)
                        .sort((lhs, rhs) => lhs.key - rhs.key)
                    state.selectedItems.push(selectedItem)
                } else {
                    state.items.push(selectedItem)
                    state.selectedItems = state.selectedItems
                        .filter(item => item.key !== selectedItem.key)
                        .sort((lhs, rhs) => lhs.key - rhs.key)
                }
            }
    }
})

const DropdownHeaderLabel = observer(() => {
    const handle = mutations(state)
    return (
        <Dropdown>
            <Label onClick={e => (state.isShowing ? handle(MutationType.Hide) : handle(MutationType.Show))}>
                {'select...'}
            </Label>
        </Dropdown>
    )
})

const hideContent = { display: 'none' }
const showContent = { display: 'block' }

const DropdownItemList = observer(() => {
    const handleSelect = mutations(state)(MutationType.Select)!
    return (
        <DropdownContent theme={state.isShowing ? showContent : hideContent}>
            {state.items.map(item => (
                <DropdownContentLabel onClick={e => handleSelect(item)}>{item.value}</DropdownContentLabel>
            ))}
        </DropdownContent>
    )
})

const DeletionItemList = observer(() => {
    const handleSelect = mutations(state)(MutationType.Select)!
    return (
        <List>
            {state.selectedItems.map((item, index) => (
                <ListItem key={index} onClick={e => handleSelect(item)}>
                    {item.value}
                </ListItem>
            ))}
        </List>
    )
})

export const DropdownComponentDemo = (props: {}) => {
    return (
        <BigBox>
            <Row>
                <Section>
                    <DropdownHeaderLabel />
                    <DropdownItemList />
                </Section>
                <Section>
                    <DeletionItemList />
                </Section>
            </Row>
        </BigBox>
    )
}
