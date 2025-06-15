import { BaseProps, store } from '../core';
import { BlockClass } from '../core/route';
import { State, STORE_EVENTS_CONFIG } from '../core/store';
import { isEqual } from '../utils';

export function withStore<P extends BaseProps = BaseProps>(
  mapStateToProps: (state: State) => P,
) {
  return function (blockClass: BlockClass<P>) {
    return class WithStore extends blockClass {
      private onChangeStoreCallback: () => void;

      constructor(props: P) {
        let state = mapStateToProps(store.get());
        super({ ...props, ...state });

        this.onChangeStoreCallback = () => {
          const newState = mapStateToProps(store.get());

          if (!isEqual(state, newState)) {
            this.setProps(newState);
            state = newState;
          }
        };

        store.on(STORE_EVENTS_CONFIG.UPDATE, this.onChangeStoreCallback);
      }

      protected render(): string {
        throw new Error('Method not implemented.');
      }
    };
  };
}
