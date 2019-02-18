import React from 'react'

import { Progress } from '../Context/context'

export const WithProgressContext = Component => props => (
  <Progress.Consumer>
    {context => <Component progressContext={context} {...props} />}
  </Progress.Consumer>
)
