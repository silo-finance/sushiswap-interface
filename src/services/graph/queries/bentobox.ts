import gql from 'graphql-tag';

export const bentoTokenFieldsQuery = gql`
  fragment bentoTokenFields on Token {
    id
    # bentoBox
    name
    symbol
    decimals
    totalSupplyElastic
    totalSupplyBase
    block
    timestamp
  }
`;

export const kashiPairFieldsQuery = gql`
  fragment kashiPairFields on KashiPair {
    id
    # bentoBox
    type
    masterContract
    owner
    feeTo
    name
    symbol
    oracle
    asset {
      ...bentoTokenFields
    }
    collateral {
      ...bentoTokenFields
    }
    exchangeRate
    totalAssetElastic
    totalAssetBase
    totalCollateralShare
    totalBorrowElastic
    totalBorrowBase
    interestPerSecond
    utilization
    feesEarnedFraction
    totalFeesEarnedFraction
    lastAccrued
    supplyAPR
    borrowAPR
    # transactions
    # users
    block
    timestamp
  }
  ${bentoTokenFieldsQuery}
`;

export const kashiPairsQuery = gql`
  query kashiPairs(
    $skip: Int = 0
    $first: Int = 1000
    $where: KashiPair_filter
    $block: Block_height
    $orderBy: KashiPair_orderBy = "utilization"
    $orderDirection: OrderDirection! = "desc"
  ) {
    kashiPairs(
      skip: $skip
      first: $first
      where: $where
      block: $block
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...kashiPairFields
    }
  }
  ${kashiPairFieldsQuery}
`;
