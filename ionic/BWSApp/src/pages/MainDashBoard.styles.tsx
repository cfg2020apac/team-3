import styled from 'styled-components'

export const ExportButtonWrapper = styled.div`
    text-align: center;
    margin-bottom: 20px
`

export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
  background-color: #eef0f3;
  border-radius: 2px;
  overflow: hidden;
  &:before {
    content: "";
    display: block;
    width: ${props => `${props.theme.filledAmount}%`};
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #0c7d84;
  }
`

export const ProgressBarLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  text-align: right;
  min-width: 140px;
  font-size: 14px;
  color: #565d66;
`

export const ProgressBarsWrapper = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 5px;
`

export const DailyQuote = styled.div`
  text-align: center;
  font-style: italic;
`

export const ProgressSummaryWrapper = styled.div`
`
