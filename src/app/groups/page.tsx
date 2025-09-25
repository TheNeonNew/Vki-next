'use client'

import { useEffect, useState } from 'react';
import { getGroupsApi } from '@/api/groupsApi';
import GroupInterface from '@/types/GroupInterface';
import Page from '@/components/layout/Page/Page';


const GroupsPage = (): React.ReactNode => {
  const [groups, setGroups] = useState<GroupInterface[]>([]);

  useEffect(() => {
    getGroupsApi().then((data) => {
      setGroups(data);
    });
  }, []);

  return (
    <Page>
      <h1>Группы</h1>
    </Page>
  );
};

export default GroupsPage;