import * as React from 'react'
import './App.css'

import ButtonDemo from './component/Button'
import { DropdownComponentDemo } from './component/DropdownMultiselect'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ButtonDemo />
                <DropdownComponentDemo />
            </div>
        )
    }
}

export default App
