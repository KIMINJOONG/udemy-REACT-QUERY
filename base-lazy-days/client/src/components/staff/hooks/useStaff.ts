import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';

// for when we need a query function for useQuery
// async function getStaff(): Promise<Staff[]> {
//   const { data } = await axiosInstance.get('/staff');
//   return data;
// }

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // TODO: get data from server via useQuery
  const fallback = [];
  const { data: staff = fallback } = useQuery(queryKeys.staff, getStaff);

  return { staff, filter, setFilter };
}
