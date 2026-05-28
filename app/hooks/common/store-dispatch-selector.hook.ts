import { ApplicationDispatch, ApplicationStateType } from "$store/redux.store";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

/**
 * Typed hook to select data from the Redux store.
 * @returns Redux state selector.
 */
const useAppSelector: TypedUseSelectorHook<ApplicationStateType> = useSelector;

/**
 * Typed hook to access the Redux dispatch function.
 * @returns The application typed dispatch.
 */
const useAppDispatch: () => ApplicationDispatch = useDispatch;

export { useAppSelector, useAppDispatch };