import { FC } from "react"
import styled from "styled-components"

interface Props {
  label: string
  checked: boolean
  onChange: () => void
}
export const SettingsOption: FC<Props> = ({ label, checked, onChange }) => (
  <StyledLabel>
    <span>{label}</span>
    <StyledCheckbox
      checked={checked}
      onChange={onChange}
    />
  </StyledLabel>
)

const StyledCheckbox = styled.input.attrs(() => ({
  type: "checkbox"
}))`
  width: 3rem;
  aspect-ratio: 1;
  accent-color: var(--c-foreground); /* Sets the checkbox color */
  border-radius: 0.5rem;
  cursor: pointer;
`

export const StyledLabel = styled.label`
  display: flex;
  gap: 2rem;
  font-size: 2.5rem;
  align-items: center;
  justify-content: space-between;
  grid-template-columns: max-content min-content;
  /* column-gap: 2rem; */
  width: 100%;
  flex: 1 0 auto;

  & > span {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 1;
    text-align: start;
  }
`
