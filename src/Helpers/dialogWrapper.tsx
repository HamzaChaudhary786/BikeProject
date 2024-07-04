import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDevice } from './useDevice';
import { CircularProgress } from '@mui/material';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  hideCrossButton?: boolean;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {!props.hideCrossButton && onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface DialogWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  noFooter?: boolean;
  noHeader?: boolean;
  hideCrossButton?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  disableSave?: boolean;
  saveButtonText?: string;
  cancelButtonText?: string;
  hideDividers?: boolean;
  hideCancelButton?: boolean;
  isLoadingActions?: boolean;
  customRadius?: boolean;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = (props) => {
  const { IsMob, IsTab } = useDevice();

  const handleClose = () => {
    props.onClose();
  };

  if (!props.isOpen) return <></>;

  return (
    <Dialog
      className={`rounded-3xl`}
      PaperProps={{
        style: { borderRadius: props.customRadius ? 16 : '' },
      }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.isOpen}
      maxWidth={'lg'}
      fullScreen={IsMob}
      fullWidth={IsTab}
    >
      {!props.noHeader && (
        <BootstrapDialogTitle
          hideCrossButton={props.hideCrossButton}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.title}
        </BootstrapDialogTitle>
      )}
      <DialogContent dividers={!props.hideDividers}>{props.content}</DialogContent>
      {!props.noFooter && (
        <DialogActions>
          {props.isLoadingActions ? (
            <CircularProgress />
          ) : (
            <>
              {props.hideCancelButton ? null : (
                <Button variant="outlined" color="primary" onClick={props.onCancel ? props.onCancel : props.onClose}>
                  {props.cancelButtonText || 'Close'}
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                disabled={props.disableSave}
                onClick={props.onSave ? props.onSave : props.onClose}
              >
                {props.saveButtonText || 'Save'}
              </Button>
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
