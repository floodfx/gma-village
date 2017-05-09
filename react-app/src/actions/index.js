import * as AccountKitContainerActions from './AccountKitContainer';
import * as AdminActions from './Admin';
import * as AuthActions from './Auth';
import * as CareNeedSaveActions from './CareNeedSave';
import * as GmaActions from './Gma';
import * as ParentActions from './Parent';
import * as UploadImageActions from './UploadImage';

export const ActionCreators = Object.assign({},
  AccountKitContainerActions,
  AdminActions,
  AuthActions,
  CareNeedSaveActions,
  GmaActions,
  ParentActions,
  UploadImageActions
)
