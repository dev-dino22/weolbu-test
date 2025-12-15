import styled from '@emotion/styled';

function FullBadge() {
  return <S.SpanBadge>마감</S.SpanBadge>;
}

export default FullBadge;

const S = {
  SpanBadge: styled.span`
    flex-shrink: 0;

    padding: 4px 12px;

    background-color: ${({ theme }) => theme.PALETTE.gray[30]};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};

    border-radius: ${({ theme }) => theme.RADIUS.small};
  `,
};
