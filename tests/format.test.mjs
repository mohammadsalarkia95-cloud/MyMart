import assert from "node:assert/strict"
import { formatPrice } from "../utils/format.js"
assert.equal(formatPrice({ value: 12.3, currency: "USD" }), "USD 12.30")
assert.equal(formatPrice({ value: 0, currency: "USD" }), "USD 0.00")
assert.equal(formatPrice({ value: 9.5 }), "9.50")
assert.equal(formatPrice({ value: "15.2", currency: "AED" }), "AED 15.20")
assert.equal(formatPrice(null), "-"); assert.equal(formatPrice(undefined), "-"); assert.equal(formatPrice("AED 10"), "AED 10")
console.log("✓ formatPrice tests passed")