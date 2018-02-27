# Rapport TP EDL
### Sujet traité : **js-must**

Url github du sujet : **https://github.com/moll/js-must**

Point traité : **Amélioration du message d'erreur pour l'assertion `length()` en y ajoutant la
différence entre la longueur attendue et la longuer actuelle**

Par exemple avec le code suivant :
```
[2,'a'].must.have.length(3)
```
Au lieu de :
```
AssertionError: [2,"a"] must have length of 3
```
il faudrait avoir :
```
AssertionError: [2,"a"] must have length of 3
+ expected - actual
-2
+3
```

### Ce qui a été réalisé :
- Modification dans le fichier `must.js` à partir de la ligne 723
```
Must.prototype.length = function(expected) {
  var ok = this.actual.length == expected
  this.assert(ok, "have length of", {expected: expected})
}
```
par
```
Must.prototype.length = function(expected) {
  var actualLength = this.actual.length
  var ok = actualLength == expected
  this.assert(ok, "have length of", {actual: actualLength, expected: expected})
}
```
- Modification dans le fichier `test/must/length_test.js` à partir de la 25

```
require("./_assertion_error_test")(function() {
    Must("hello").have.length(42)
  }, {
    actual: "hello",
    expected: 42,
    message: "\"hello\" must have length of 42"
  })
```
par
```
require("./_assertion_error_test")(function() {
    Must("hello").have.length(42)
  }, {
    actual: "hello".length, //<- modifié
    expected: 42,
    message: "\"hello\" must have length of 42"
  })
```

#### Test
Pour tester sur votre machine, clonez le projet https://github.com/herintsoa-hasina/tp-edl.git
puis `npm install` et `npm test`. Le fichier `package.json` au niveau du `devDependencies` :
```
"devDependencies": {
    "mocha": "5.0.1",
    "must": "git://github.com/herintsoa-hasina/js-must.git#36454a51a18df9f32d0341b8ea12d4d74381ede5"
}
```
En sortie du test :
```
1) Length Must test
       array must have length:

      AssertionError: [2,"a"] must have length of 3
      + expected - actual

      -2
      +3
      
      at Context.<anonymous> (test/must_test.js:5:27)

  2) Length Must test
       string must have length:

      AssertionError: "hello" must have length of 3
      + expected - actual

      -5
      +3
```
