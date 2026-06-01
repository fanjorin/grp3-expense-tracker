import Link from "next/link";

export default function AddExpenseHeader() {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Back Arrow */}
      <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 text-xl">
        ←
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter the details of your expense
        </p>
      </div>
    </div>
  );
}