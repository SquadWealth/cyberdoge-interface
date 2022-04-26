import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { AppState } from '../state';
import { ApplicationModal } from './actions';
import { setOpenModal } from './actions';

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}
