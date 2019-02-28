export default (function (_, Kotlin) {
  'use strict';
  console.log(Kotlin)
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var shuffled = Kotlin.kotlin.collections.shuffled_7wnvza$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var IllegalStateException_init = Kotlin.kotlin.IllegalStateException_init_pdl1vj$;
  var sum = Kotlin.kotlin.collections.sum_plj8ka$;
  var contentDeepToString = Kotlin.arrayDeepToString;
  var toString = Kotlin.toString;
  var L0 = Kotlin.Long.ZERO;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init;
  var sort = Kotlin.primitiveArraySort;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  function RoyalGameOfUr() {
    RoyalGameOfUr$Companion_getInstance();
    this.currentPlayer_1fv908$_0 = 0;
    this.roll_5oarv$_0 = RoyalGameOfUr$Companion_getInstance().NOT_ROLLED_0;
    this.pieces_0 = null;
  }
  Object.defineProperty(RoyalGameOfUr.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_1fv908$_0;
    },
    set: function (currentPlayer) {
      this.currentPlayer_1fv908$_0 = currentPlayer;
    }
  });
  Object.defineProperty(RoyalGameOfUr.prototype, 'roll', {
    get: function () {
      return this.roll_5oarv$_0;
    },
    set: function (roll) {
      this.roll_5oarv$_0 = roll;
    }
  });
  RoyalGameOfUr.prototype.isRollTime = function () {
    return this.roll === RoyalGameOfUr$Companion_getInstance().NOT_ROLLED_0;
  };
  Object.defineProperty(RoyalGameOfUr.prototype, 'isMoveTime', {
    get: function () {
      return this.roll > 0;
    }
  });
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var copyToArray = Kotlin.kotlin.collections.copyToArray;
  Object.defineProperty(RoyalGameOfUr.prototype, 'piecesCopy', {
    get: function () {
      var $receiver = this.pieces_0;
      var destination = ArrayList_init($receiver.length);
      var tmp$;
      for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
        var item = $receiver[tmp$];
        destination.add_11rb$(item.slice());
      }
      return copyToArray(destination);
    }
  });
  Object.defineProperty(RoyalGameOfUr.prototype, 'isFinished', {
    get: function () {
      return this.winner !== RoyalGameOfUr$Companion_getInstance().NO_WINNER_0;
    }
  });
  Object.defineProperty(RoyalGameOfUr.prototype, 'winner', {
    get: function () {
      var tmp$;
      tmp$ = this.pieces_0;
      loop_label: for (var i = 0; i !== tmp$.length; ++i) {
        var $receiver = this.pieces_0[i];
        var all$result;
        all$break: do {
          var tmp$_0;
          for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
            var element = $receiver[tmp$_0];
            if (!(element === RoyalGameOfUr$Companion_getInstance().EXIT)) {
              all$result = false;
              break all$break;
            }
          }
          all$result = true;
        }
         while (false);
        if (all$result) {
          return i;
        }
      }
      return RoyalGameOfUr$Companion_getInstance().NO_WINNER_0;
    }
  });
  RoyalGameOfUr.prototype.randomBoolean = function () {
    return first(shuffled(new IntRange(0, 1))) === 1;
  };
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  RoyalGameOfUr.prototype.doRoll = function () {
    if (!this.isRollTime()) {
      throw IllegalStateException_init('Not time to roll. Current roll is ' + this.roll);
    }
    var $receiver = new IntRange(0, 3);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(this.randomBoolean() ? 1 : 0);
    }
    var sum_0 = sum(destination);
    return this.doRoll_za3lpa$(sum_0);
  };
  RoyalGameOfUr.prototype.doRoll_za3lpa$ = function (sum) {
    if (this.canMove_za3lpa$(sum)) {
      this.roll = sum;
    }
     else {
      this.nextPlayer_0();
    }
    return sum;
  };
  RoyalGameOfUr.prototype.nextPlayer_0 = function () {
    this.currentPlayer = (this.currentPlayer + 1 | 0) % 2;
  };
  RoyalGameOfUr.prototype.canMove_za3lpa$ = function (roll) {
    var tmp$;
    if (roll === 0) {
      return false;
    }
    tmp$ = this.pieces_0[this.currentPlayer].length;
    for (var i = 0; i < tmp$; i++) {
      var position = this.pieces_0[this.currentPlayer][i];
      var nextPosition = position + roll | 0;
      if (this.canMoveTo_0(this.currentPlayer, nextPosition)) {
        return true;
      }
    }
    return false;
  };
  RoyalGameOfUr.prototype.canMoveTo_0 = function (currentPlayer, nextPosition) {
    var tmp$;
    if (this.isFinished) {
      return false;
    }
    if (nextPosition === RoyalGameOfUr$Companion_getInstance().EXIT) {
      return true;
    }
    if (nextPosition > RoyalGameOfUr$Companion_getInstance().EXIT) {
      return false;
    }
    if (nextPosition >= 5 && nextPosition <= (RoyalGameOfUr$Companion_getInstance().EXIT - 3 | 0)) {
      if (this.isFlower_za3lpa$(nextPosition)) {
        tmp$ = this.pieces_0;
        for (var player = 0; player !== tmp$.length; ++player) {
          if (this.playerOccupies_vux9f0$(player, nextPosition)) {
            return false;
          }
        }
        return true;
      }
       else {
        return !this.playerOccupies_vux9f0$(currentPlayer, nextPosition);
      }
    }
     else {
      return !this.playerOccupies_vux9f0$(currentPlayer, nextPosition);
    }
  };
  RoyalGameOfUr.prototype.playerOccupies_vux9f0$ = function (currentPlayer, position) {
    var tmp$;
    tmp$ = this.pieces_0[currentPlayer].length;
    for (var piece = 0; piece < tmp$; piece++) {
      if (this.pieces_0[currentPlayer][piece] === position) {
        return true;
      }
    }
    return false;
  };
  RoyalGameOfUr.prototype.canMove_qt1dr2$ = function (playerIndex, position, steps) {
    return this.playerOccupies_vux9f0$(playerIndex, position) && this.canMoveTo_0(playerIndex, position + steps | 0);
  };
  RoyalGameOfUr.prototype.move_qt1dr2$ = function (playerIndex, position, steps) {
    var tmp$;
    if (this.isFinished) {
      return false;
    }
    if (!this.canMove_qt1dr2$(playerIndex, position, steps)) {
      return false;
    }
    tmp$ = this.pieces_0[playerIndex].length;
    for (var i = 0; i < tmp$; i++) {
      if (this.pieces_0[playerIndex][i] === position) {
        this.pieces_0[playerIndex][i] = position + steps | 0;
        this.performKnockout_0(playerIndex, position + steps | 0);
        this.roll = RoyalGameOfUr$Companion_getInstance().NOT_ROLLED_0;
        if (!this.isFlower_za3lpa$(position + steps | 0)) {
          this.nextPlayer_0();
        }
        return true;
      }
    }
    return false;
  };
  RoyalGameOfUr.prototype.performKnockout_0 = function (playerIndex, position) {
    var tmp$;
    var opponent = (playerIndex + 1 | 0) % this.pieces_0.length;
    if (position <= 4 || position > 12) {
      return;
    }
    if (this.isFlower_za3lpa$(position)) {
      return;
    }
    tmp$ = this.pieces_0[opponent].length;
    for (var j = 0; j < tmp$; j++) {
      if (this.pieces_0[opponent][j] === position) {
        this.pieces_0[opponent][j] = 0;
      }
    }
  };
  RoyalGameOfUr.prototype.isFlower_za3lpa$ = function (position) {
    return position === 4 || position === 8 || position === (RoyalGameOfUr$Companion_getInstance().EXIT - 1 | 0);
  };
  RoyalGameOfUr.prototype.canKnockout_za3lpa$ = function (position) {
    return position > 4 && position < (RoyalGameOfUr$Companion_getInstance().EXIT - 2 | 0) && !this.isFlower_za3lpa$(position);
  };
  RoyalGameOfUr.prototype.toString = function () {
    return 'RoyalGameOfUr{' + 'pieces=' + contentDeepToString(this.pieces_0) + ', currentPlayer=' + toString(this.currentPlayer) + ', roll=' + toString(this.roll) + String.fromCharCode(125);
  };
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  RoyalGameOfUr.prototype.toLong = function () {
    var tmp$, tmp$_0;
    var cp = this.currentPlayer;
    var op = 1 - cp | 0;
    var result = L0;
    var $receiver = this.pieces_0[cp];
    var destination = ArrayList_init_0();
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
      var element = $receiver[tmp$_1];
      if (element === 0)
        destination.add_11rb$(element);
    }
    var numberHome1 = destination.size;
    var $receiver_0 = this.pieces_0[op];
    var destination_0 = ArrayList_init_0();
    var tmp$_2;
    for (tmp$_2 = 0; tmp$_2 !== $receiver_0.length; ++tmp$_2) {
      var element_0 = $receiver_0[tmp$_2];
      if (element_0 === 0)
        destination_0.add_11rb$(element_0);
    }
    var numberHome2 = destination_0.size;
    var $receiver_1 = this.pieces_0[cp];
    var destination_1 = ArrayList_init_0();
    var tmp$_3;
    for (tmp$_3 = 0; tmp$_3 !== $receiver_1.length; ++tmp$_3) {
      var element_1 = $receiver_1[tmp$_3];
      if (element_1 === RoyalGameOfUr$Companion_getInstance().EXIT)
        destination_1.add_11rb$(element_1);
    }
    var numberGoal1 = destination_1.size;
    var $receiver_2 = this.pieces_0[op];
    var destination_2 = ArrayList_init_0();
    var tmp$_4;
    for (tmp$_4 = 0; tmp$_4 !== $receiver_2.length; ++tmp$_4) {
      var element_2 = $receiver_2[tmp$_4];
      if (element_2 === RoyalGameOfUr$Companion_getInstance().EXIT)
        destination_2.add_11rb$(element_2);
    }
    var numberGoal2 = destination_2.size;
    var dice = this.roll - 1 | 0;
    if (this.isFinished) {
      dice = 0;
    }
     else if (dice < 0 || dice >= 4) {
      throw IllegalStateException_init('Invalid dice value for serializing: ' + dice);
    }
    var p1 = this.piecesToArray_0(this.pieces_0[cp]);
    var p2 = this.piecesToArray_0(this.pieces_0[op]);
    result = result.add(Kotlin.Long.fromInt(numberHome1));
    result = result.shiftLeft(3);
    result = result.add(Kotlin.Long.fromInt(numberHome2));
    result = result.shiftLeft(3);
    result = result.add(Kotlin.Long.fromInt(numberGoal1));
    result = result.shiftLeft(3);
    result = result.add(Kotlin.Long.fromInt(numberGoal2));
    result = result.shiftLeft(3);
    result = result.add(Kotlin.Long.fromInt(dice));
    result = result.shiftLeft(2);
    for (tmp$ = 0; tmp$ !== p1.length; ++tmp$) {
      var b = p1[tmp$];
      result = result.add(Kotlin.Long.fromInt(b ? 1 : 0));
      result = result.shiftLeft(1);
    }
    for (tmp$_0 = 0; tmp$_0 !== p2.length; ++tmp$_0) {
      var b_0 = p2[tmp$_0];
      result = result.add(Kotlin.Long.fromInt(b_0 ? 1 : 0));
      result = result.shiftLeft(1);
    }
    return result;
  };
  RoyalGameOfUr.prototype.piecesToArray_0 = function (pieces) {
    var tmp$;
    var result = Kotlin.booleanArray(14);
    for (tmp$ = 0; tmp$ !== pieces.length; ++tmp$) {
      var p = pieces[tmp$];
      if (p !== 0 && p !== 15) {
        result[p - 1 | 0] = true;
      }
    }
    return result;
  };
  RoyalGameOfUr.prototype.toCompactString = function () {
    var tmp$, tmp$_0;
    var str = StringBuilder_init();
    str.append_s8jyv4$(this.currentPlayer);
    var p0 = this.pieces_0[0].slice();
    sort(p0);
    var p1 = this.pieces_0[1].slice();
    sort(p1);
    for (tmp$ = 0; tmp$ !== p0.length; ++tmp$) {
      var aP0 = p0[tmp$];
      str.append_s8jyv4$(aP0);
    }
    for (tmp$_0 = 0; tmp$_0 !== p1.length; ++tmp$_0) {
      var aP1 = p1[tmp$_0];
      str.append_s8jyv4$(aP1);
    }
    return str.toString();
  };
  RoyalGameOfUr.prototype.copy = function () {
    return RoyalGameOfUr_init_0(this.currentPlayer, this.roll, this.piecesCopy);
  };
  function RoyalGameOfUr$Companion() {
    RoyalGameOfUr$Companion_instance = this;
    this.NOT_ROLLED_0 = -1;
    this.NO_WINNER_0 = -1;
    this.EXIT = 15;
  }
  RoyalGameOfUr$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var RoyalGameOfUr$Companion_instance = null;
  function RoyalGameOfUr$Companion_getInstance() {
    if (RoyalGameOfUr$Companion_instance === null) {
      new RoyalGameOfUr$Companion();
    }
    return RoyalGameOfUr$Companion_instance;
  }
  RoyalGameOfUr.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RoyalGameOfUr',
    interfaces: []
  };
  var Array_0 = Array;
  function RoyalGameOfUr_init($this) {
    $this = $this || Object.create(RoyalGameOfUr.prototype);
    RoyalGameOfUr.call($this);
    $this.currentPlayer = 0;
    $this.roll = RoyalGameOfUr$Companion_getInstance().NOT_ROLLED_0;
    var array = Array_0(2);
    var tmp$;
    tmp$ = array.length - 1 | 0;
    for (var i = 0; i <= tmp$; i++) {
      array[i] = new Int32Array(7);
    }
    $this.pieces_0 = array;
    return $this;
  }
  function RoyalGameOfUr_init_0(currentPlayer, roll, pieces, $this) {
    $this = $this || Object.create(RoyalGameOfUr.prototype);
    RoyalGameOfUr.call($this);
    $this.currentPlayer = currentPlayer;
    $this.roll = roll;
    var destination = ArrayList_init(pieces.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== pieces.length; ++tmp$) {
      var item = pieces[tmp$];
      destination.add_11rb$(item.slice());
    }
    $this.pieces_0 = copyToArray(destination);
    return $this;
  }
  Object.defineProperty(RoyalGameOfUr, 'Companion', {
    get: RoyalGameOfUr$Companion_getInstance
  });
  var package$net = _.net || (_.net = {});
  var package$zomis = package$net.zomis || (package$net.zomis = {});
  var package$games = package$zomis.games || (package$zomis.games = {});
  var package$ur = package$games.ur || (package$games.ur = {});
  package$ur.RoyalGameOfUr_init = RoyalGameOfUr_init;
  package$ur.RoyalGameOfUr_init_fwq3ux$ = RoyalGameOfUr_init_0;
  package$ur.RoyalGameOfUr = RoyalGameOfUr;
  Kotlin.defineModule('flags-js', _);
  return _;
}({}, require('kotlin')));
