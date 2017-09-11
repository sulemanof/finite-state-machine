class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) throw new Error('Config isn\'t passed');
      this._config = config;
      this.state = [this._config.initial];
      this.basket = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state[this.state.length - 1];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this._config.states[state]) {
        this.state.push(state);
        this.basket = [];
      }else {
        throw new Error('State isn\'t exist');
      }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      var state = this.getState();
      if (this._config.states[state].transitions[event]) {
        this.state.push(this._config.states[state].transitions[event]);
        this.basket = [];
      } else {
        throw new Error('Event in current state isn\'t exist');
      }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = [this._config.initial];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var states = [];
      for (var param in this._config.states) {
        if (!event) states.push(param);
        else {
          if (event in this._config.states[param].transitions) states.push(param);
        }
      }
      return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.state.length !== 1) {
        this.basket.push(this.state.pop());
        return true;
      } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      var deleted = this.basket.pop();
      if (deleted) {
        this.state.push(deleted);
        return true;
      } else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.state = [this._config.initial];
      this.basket = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
