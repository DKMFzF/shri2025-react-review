import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../../components';
import { CommonSectionUI, CommonPageUI } from '../../components/ui';

export const AppLayout = () => {
  return (
    <CommonPageUI>
      <AppHeader />
      <main id="main-content">
        <CommonSectionUI>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </CommonSectionUI>
      </main>
    </CommonPageUI>
  );
};
