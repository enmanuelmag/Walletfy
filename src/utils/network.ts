/* eslint-disable @typescript-eslint/no-explicit-any */
import queryClient from '@api/datasource/query'
import { UseQueryResult } from '@tanstack/react-query'

export const isLoadingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isLoading)
}

export const isLoadingOrRefetchQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching || r.isLoading)
}

export const isRefetchingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching)
}

export const isLoadingMutation = (...results: any[]) => {
  return results.some((r) => r.isPending && !r.isIdle)
}

type InvalidateDataQueryParams<T> = {
  queryKeys: any[]
  exact?: boolean
  data?: T
}

export const invalidateDataQuery = async <T>(params: InvalidateDataQueryParams<T>) => {
  const { queryKeys, exact, data } = params
  if (exact) {
    if (data) {
      queryClient.setQueryData<T, string[], T>(queryKeys, (prev) => ({
        ...prev,
        ...data,
      }))
    } else {
      queryClient.setQueryData(queryKeys, undefined)
    }

    return await queryClient.invalidateQueries({
      queryKey: queryKeys,
      refetchType: 'all',
      exact: true,
    })
  }

  return await queryClient.invalidateQueries({
    predicate: (query) => queryKeys.includes(query.queryKey[0] as string),
    refetchType: 'all',
  })
}
