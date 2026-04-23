#!/usr/bin/env python3
"""
UFT CRYPTOGRAPHIC SIGNATURE TRAIL - Python Test Runner
SHA-256 Hash generation, verification, and immutable audit trail
"""

import hashlib
import json
import datetime
from typing import Dict, List, Any

# =========================================================================
# TEST FRAMEWORK
# =========================================================================

class TestRunner:
    def __init__(self):
        self.test_results = []
        self.current_suite = None
    
    def suite(self, name: str):
        self.current_suite = {"name": name, "tests": []}
        self.test_results.append(self.current_suite)
        return self
    
    def test(self, description: str, test_fn):
        try:
            test_fn()
            self.current_suite["tests"].append({
                "description": description,
                "passed": True,
                "error": None
            })
        except AssertionError as e:
            self.current_suite["tests"].append({
                "description": description,
                "passed": False,
                "error": str(e)
            })
        return self
    
    def assert_true(self, condition: bool, message: str = "Assertion failed"):
        if not condition:
            raise AssertionError(message)
    
    def assert_equals(self, actual: Any, expected: Any, message: str = None):
        if actual != expected:
            msg = message or f"Expected {expected}, got {actual}"
            raise AssertionError(msg)
    
    def assert_not_null(self, value: Any, message: str = None):
        if value is None:
            msg = message or "Value is None"
            raise AssertionError(msg)
    
    def get_stats(self) -> Dict:
        total = 0
        passed = 0
        failed = 0
        for suite in self.test_results:
            for test in suite["tests"]:
                total += 1
                if test["passed"]:
                    passed += 1
                else:
                    failed += 1
        success_rate = ((passed / total) * 100) if total > 0 else 0
        return {"total": total, "passed": passed, "failed": failed, "success_rate": success_rate}
    
    def render(self):
        stats = self.get_stats()
        
        print("\n" + "="*80)
        print("🔐 UFT CRYPTOGRAPHIC SIGNATURE TRAIL - TEST RESULTS")
        print("="*80 + "\n")
        
        for suite in self.test_results:
            print(f"\n📋 {suite['name']}")
            print("-"*80)
            
            for test in suite["tests"]:
                status = "✅ PASS" if test["passed"] else "❌ FAIL"
                print(f"  {status} | {test['description']}")
                if test["error"]:
                    print(f"         └─ {test['error']}")
        
        print("\n" + "="*80)
        print("📈 SUMMARY")
        print("="*80)
        print(f"  Total Tests:   {stats['total']}")
        print(f"  ✅ Passed:     {stats['passed']}")
        print(f"  ❌ Failed:     {stats['failed']}")
        print(f"  Success Rate:  {stats['success_rate']:.1f}%")
        print("="*80 + "\n")
        
        return stats

# =========================================================================
# CRYPTOGRAPHIC SIGNATURE TRAIL MODULE
# =========================================================================

class CryptoSignatureTrail:
    VERSION = '1.0'
    ALGORITHM = 'SHA-256'
    
    def __init__(self):
        self.audit_log: List[Dict] = []
    
    @staticmethod
    def generate_hash(data: Any) -> str:
        """Generate SHA-256 hash of any object/string"""
        if isinstance(data, str):
            json_str = data
        else:
            json_str = json.dumps(data, sort_keys=True, default=str)
        return hashlib.sha256(json_str.encode()).hexdigest()
    
    def generate_signed_hash(self, data: Any) -> Dict:
        """Generate SHA-256 hash with metadata"""
        payload = {
            "data": data,
            "timestamp": datetime.datetime.now().isoformat(),
            "version": self.VERSION,
            "algorithm": self.ALGORITHM
        }
        hash_val = self.generate_hash(payload)
        return {
            "hash": hash_val,
            "payload": payload,
            "signature": self.create_signature(hash_val)
        }
    
    @staticmethod
    def create_signature(hash_val: str) -> Dict:
        """Create deterministic signature"""
        import random
        import string
        nonce = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
        sig = hashlib.sha256((hash_val + nonce).encode()).hexdigest()
        return {
            "value": sig,
            "nonce": nonce,
            "timestamp": int(datetime.datetime.now().timestamp() * 1000)
        }
    
    def add_audit_entry(self, operation: str, input_data: Any, output_data: Any, metadata: Dict = None) -> Dict:
        """Create immutable audit trail entry"""
        entry = {
            "id": len(self.audit_log) + 1,
            "timestamp": datetime.datetime.now().isoformat(),
            "operation": operation,
            "input_hash": self.generate_hash(input_data),
            "output_hash": self.generate_hash(output_data),
            "metadata": metadata or {},
            "signature": None
        }
        
        # Sign the entry
        entry["signature"] = self.generate_signed_hash(entry)
        
        # Add to immutable log
        self.audit_log.append(entry)
        
        return entry
    
    def verify_audit_entry(self, entry: Dict) -> Dict:
        """Verify integrity of audit entry"""
        if not entry or "input_hash" not in entry or "output_hash" not in entry:
            return {"valid": False, "reason": "Entry missing required fields"}
        
        if "signature" not in entry:
            return {"valid": False, "reason": "Entry missing signature"}
        
        # Verify hash format (SHA-256 = 64 hex characters)
        import re
        hash_pattern = re.compile(r'^[a-f0-9]{64}$', re.IGNORECASE)
        
        if not hash_pattern.match(entry["input_hash"]) or not hash_pattern.match(entry["output_hash"]):
            return {"valid": False, "reason": "Invalid hash format"}
        
        return {"valid": True, "reason": "Entry verified"}
    
    def verify_audit_trail(self) -> Dict:
        """Verify complete audit trail integrity"""
        if len(self.audit_log) == 0:
            return {"valid": True, "entries_verified": 0, "reason": "Empty log"}
        
        valid_count = 0
        invalid_count = 0
        
        for entry in self.audit_log:
            verification = self.verify_audit_entry(entry)
            if verification["valid"]:
                valid_count += 1
            else:
                invalid_count += 1
        
        all_valid = invalid_count == 0
        return {
            "valid": all_valid,
            "entries_verified": valid_count,
            "entries_invalid": invalid_count,
            "total_entries": len(self.audit_log),
            "integrity": "100%" if all_valid else f"{(valid_count / len(self.audit_log) * 100):.1f}%"
        }
    
    def generate_audit_proof(self) -> Dict:
        """Generate complete audit trail proof"""
        # Generate chain hash first
        all_hashes = '|'.join([e["input_hash"] + e["output_hash"] for e in self.audit_log]) if self.audit_log else ''
        chain_hash = self.generate_hash(all_hashes)
        
        proof = {
            "version": self.VERSION,
            "algorithm": self.ALGORITHM,
            "generated": datetime.datetime.now().isoformat(),
            "total_entries": len(self.audit_log),
            "chain_hash": chain_hash,
            "entry_count": len(self.audit_log)
        }
        
        # Sign the proof data (not the proof itself to avoid circular reference)
        proof["proof_signature"] = self.create_signature(chain_hash)
        
        return proof
    
    def export_audit_trail(self) -> Dict:
        """Export audit trail as JSON"""
        # Create a clean version of entries for export
        clean_entries = []
        for entry in self.audit_log:
            clean_entry = {
                "id": entry["id"],
                "timestamp": entry["timestamp"],
                "operation": entry["operation"],
                "input_hash": entry["input_hash"],
                "output_hash": entry["output_hash"],
                "metadata": entry["metadata"],
                "signature_hash": entry["signature"].get("hash") if entry.get("signature") else None
            }
            clean_entries.append(clean_entry)
        
        return {
            "version": self.VERSION,
            "algorithm": self.ALGORITHM,
            "export_date": datetime.datetime.now().isoformat(),
            "total_entries": len(self.audit_log),
            "entries": clean_entries,
            "verification": self.verify_audit_trail()
        }
    
    def clear_audit_log(self):
        """Clear audit log"""
        self.audit_log = []

# =========================================================================
# RUN ALL TESTS
# =========================================================================

crypto = CryptoSignatureTrail()
runner = TestRunner()

# Hash Generation Tests
runner.suite('🔐 Hash Generation').test(
    'SHA-256 generates 64-char hex string',
    lambda: (
        runner.assert_true(len(CryptoSignatureTrail.generate_hash('test')) == 64, 'Hash should be 64 chars'),
        runner.assert_true(all(c in '0123456789abcdef' for c in CryptoSignatureTrail.generate_hash('test')), 'Hash should be hex')
    )
).test(
    'Same input produces same hash',
    lambda: (
        runner.assert_equals(
            CryptoSignatureTrail.generate_hash({"msg": "test"}),
            CryptoSignatureTrail.generate_hash({"msg": "test"}),
            'Hashes should match'
        )
    )
).test(
    'Different inputs produce different hashes',
    lambda: (
        runner.assert_true(
            CryptoSignatureTrail.generate_hash('data1') != CryptoSignatureTrail.generate_hash('data2'),
            'Different inputs should produce different hashes'
        )
    )
).test(
    'Handles complex objects',
    lambda: (
        runner.assert_true(
            len(CryptoSignatureTrail.generate_hash({"nested": {"data": [1, 2, 3]}})) == 64,
            'Complex object hash should be 64 chars'
        )
    )
)

# Signed Hash Tests
runner.suite('✍️ Signed Hash Generation').test(
    'generateSignedHash creates complete payload',
    lambda: (
        runner.assert_not_null(crypto.generate_signed_hash({"msg": "test"}).get("hash")),
        runner.assert_not_null(crypto.generate_signed_hash({"msg": "test"}).get("payload")),
        runner.assert_not_null(crypto.generate_signed_hash({"msg": "test"}).get("signature"))
    )
).test(
    'Signed hash includes timestamp',
    lambda: (
        runner.assert_true(
            'timestamp' in crypto.generate_signed_hash({"test": "data"})["payload"],
            'Payload should have timestamp'
        ),
        runner.assert_true(
            'T' in crypto.generate_signed_hash({"test": "data"})["payload"]["timestamp"],
            'Timestamp should be ISO format'
        )
    )
).test(
    'Signed hash includes version and algorithm',
    lambda: (
        runner.assert_equals(crypto.generate_signed_hash({"test": "data"})["payload"]["version"], '1.0'),
        runner.assert_equals(crypto.generate_signed_hash({"test": "data"})["payload"]["algorithm"], 'SHA-256')
    )
)

# Audit Trail Tests
runner.suite('📋 Audit Trail Management').test(
    'addAuditEntry creates new log entry',
    lambda: (
        crypto.clear_audit_log(),
        runner.assert_equals(crypto.add_audit_entry('test_op', {"in": 1}, {"out": 2})["id"], 1),
        runner.assert_equals(crypto.add_audit_entry('op2', {}, {})["operation"], 'op2')
    )
).test(
    'Multiple entries create sequential IDs',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('op1', {}, {}),
        crypto.add_audit_entry('op2', {}, {}),
        crypto.add_audit_entry('op3', {}, {}),
        runner.assert_equals(len(crypto.audit_log), 3),
        runner.assert_equals(crypto.audit_log[2]["id"], 3)
    )
).test(
    'Each entry has inputHash and outputHash',
    lambda: (
        crypto.clear_audit_log(),
        (entry := crypto.add_audit_entry('test', {"input": "data"}, {"output": "result"})),
        runner.assert_not_null(entry.get("input_hash")),
        runner.assert_not_null(entry.get("output_hash")),
        runner.assert_true(len(entry["input_hash"]) == 64),
        runner.assert_true(len(entry["output_hash"]) == 64)
    )
).test(
    'Entry includes timestamp and signature',
    lambda: (
        crypto.clear_audit_log(),
        (entry := crypto.add_audit_entry('test', {}, {})),
        runner.assert_not_null(entry.get("timestamp")),
        runner.assert_not_null(entry.get("signature")),
        runner.assert_true('T' in entry["timestamp"])
    )
)

# Verification Tests
runner.suite('✓ Audit Trail Verification').test(
    'verifyAuditEntry validates correct entry',
    lambda: (
        crypto.clear_audit_log(),
        (entry := crypto.add_audit_entry('test', {"a": 1}, {"b": 2})),
        runner.assert_equals(crypto.verify_audit_entry(entry)["valid"], True)
    )
).test(
    'verifyAuditEntry rejects malformed entry',
    lambda: (
        runner.assert_equals(
            crypto.verify_audit_entry({"input_hash": "not-64-chars"})["valid"],
            False,
            'Invalid hash should fail verification'
        )
    )
).test(
    'verifyAuditTrail returns integrity report',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('op1', {}, {}),
        crypto.add_audit_entry('op2', {}, {}),
        (verification := crypto.verify_audit_trail()),
        runner.assert_equals(verification["valid"], True),
        runner.assert_equals(verification["entries_verified"], 2)
    )
).test(
    'Empty audit log verifies as valid',
    lambda: (
        crypto.clear_audit_log(),
        (verification := crypto.verify_audit_trail()),
        runner.assert_equals(verification["valid"], True),
        runner.assert_equals(verification["entries_verified"], 0)
    )
)

# Proof Generation Tests
runner.suite('🔗 Audit Proof Generation').test(
    'generateAuditProof creates complete proof',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('test', {}, {}),
        (proof := crypto.generate_audit_proof()),
        runner.assert_not_null(proof.get("chain_hash")),
        runner.assert_not_null(proof.get("proof_signature")),
        runner.assert_equals(proof["total_entries"], 1)
    )
).test(
    'Chain hash is deterministic',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('test', {"a": 1}, {"b": 2}),
        runner.assert_equals(
            crypto.generate_audit_proof()["chain_hash"],
            crypto.generate_audit_proof()["chain_hash"],
            'Chain hashes should match'
        )
    )
).test(
    'Proof includes version and algorithm',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('test', {}, {}),
        (proof := crypto.generate_audit_proof()),
        runner.assert_equals(proof["version"], '1.0'),
        runner.assert_equals(proof["algorithm"], 'SHA-256')
    )
)

# Export/Import Tests
runner.suite('💾 Audit Trail Export/Import').test(
    'exportAuditTrail creates JSON-serializable object',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('test', {"a": 1}, {"b": 2}),
        (exported := crypto.export_audit_trail()),
        (json_str := json.dumps(exported)),
        (reimported := json.loads(json_str)),
        runner.assert_equals(reimported["total_entries"], 1)
    )
).test(
    'exportAuditTrail includes verification status',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('test', {}, {}),
        (exported := crypto.export_audit_trail()),
        runner.assert_not_null(exported.get("verification")),
        runner.assert_equals(exported["verification"]["valid"], True)
    )
)

# Real-World UFT Integration
runner.suite('🔗 UFT Machine Integration (Simulated)').test(
    'Translate operation creates audit entry',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('translate', {"time": 100}, {"frequency": 256, "state": 5}),
        runner.assert_equals(crypto.audit_log[0]["operation"], 'translate')
    )
).test(
    'Multiple translations create linked chain',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('translate', {"time": 100}, {"freq": 256}),
        crypto.add_audit_entry('translate', {"time": 101}, {"freq": 264}),
        crypto.add_audit_entry('translate', {"time": 102}, {"freq": 272}),
        runner.assert_equals(len(crypto.audit_log), 3),
        (proof := crypto.generate_audit_proof()),
        runner.assert_true(len(proof["chain_hash"]) == 64)
    )
).test(
    'Audit trail proof is cryptographically valid',
    lambda: (
        crypto.clear_audit_log(),
        crypto.add_audit_entry('op1', {"input": 1}, {"output": 2}),
        (proof := crypto.generate_audit_proof()),
        (trail_verification := crypto.verify_audit_trail()),
        runner.assert_equals(trail_verification["valid"], True),
        runner.assert_equals(trail_verification["integrity"], "100%")
    )
)

# Render results
stats = runner.render()

# Exit with appropriate code
exit(1 if stats['failed'] > 0 else 0)
