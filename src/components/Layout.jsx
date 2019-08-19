import styled from 'styled-components'

export default styled.div`
  padding: calc(2.625rem + 75px) 1.3125rem;
  width: 70%;
  max-width: 850px;
  margin: 0 auto;

  @media only screen and (max-width: 425px) {
    width: 100%;
    max-width: none;
  }
`
