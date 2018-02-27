require("must/register")

describe("Length Must test", function() {
      it("array must have length", function() {
        [2,'a'].must.have.length(3)
      })

      it("string must have length", function() {
        "hello".must.have.length(3)
      })

})
