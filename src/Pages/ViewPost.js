import React from 'react'
import { withRouter } from 'react-router-dom'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'

function ViewPost(props) {
    console.warn(props.match.params.id)
    return (
        <div>
            <Header />
            <View id={props.match.params.id} />
        </div>
    )
}

export default withRouter(ViewPost)
