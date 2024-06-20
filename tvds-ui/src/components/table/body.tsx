import styled from "@emotion/styled";

export const TableBox = styled.div`
  width: 100%;
  box-shadow: 0 0 0.25rem #0004;
`;

export const Container = styled.div`
  height: ${(props: { height: string }) => props.height};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
`;

export const THead = styled.thead`
  color: #fffd;
  position: sticky;
  top: 0;
  z-index: 1;
  background: ${props => (props.theme as any).colors.primary};
  & > tr {
    display: table-row;
    height: 2.5rem;
  }
`;

export const TBody = styled.tbody`
  & > tr {
    display: table-row;
    &:nth-of-type(even) {
      background: #8882;
    }
    &:hover {
      background: #8884;
    }
    & > td {
      padding: 0.25rem 0.5rem;
      border: solid 0.0625rem #8888;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

export const Resizer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 0.25rem;
  border-left: 0.125rem solid #0002;
  border-right: 0.0625rem solid #0004;
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  ${(props: { isResizing: boolean }) =>
		props.isResizing && "background: #0004;"};
`;
