'use client';

import { Phone, Search, ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";



interface PhoneNumber {
  phoneNumber: string;
  isoCountry?: string;
  capabilities?: {
    voice: boolean;
    sms: boolean;
    mms: boolean;
  };
  price?: string;
}

export default function PhoneSelectionPage() {
  // --- Search State ---
  const [country, setCountry] = useState('US');
  const [areaCode, setAreaCode] = useState('');
  const [type, setType] = useState('Local');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [availableNumbers, setAvailableNumbers] = useState<PhoneNumber[]>([]);

  // --- Buy State ---
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [friendlyNameInput, setFriendlyNameInput] = useState('');
  const [purchaseMessage, setPurchaseMessage] = useState('');
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  // --- UI Flow State ---
  const [currentStep, setCurrentStep] = useState<'search' | 'selectAndBuy'>('search');

  // --- Popup State ---
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupPhoneNumber, setPopupPhoneNumber] = useState('');

  // Other props (like industry from searchParams)
  const searchParams = useSearchParams();
  const industryRaw = searchParams.get('industry') || '';
  const industry = industryRaw.toLowerCase().replace(/-/g, '');
  const router = useRouter();

  const handleSearch = async () => {
    setLoadingSearch(true);
    setSearchError('');
    setAvailableNumbers([]);
    setSelectedNumber(null);
    setPurchaseMessage('');
    setShowPopup(false);

    try {
      const queryParams = new URLSearchParams({
        country: country,
        type: type,
        ...(areaCode && { areaCode: areaCode }),
        smsEnabled: 'true',
        voiceEnabled: 'true',
      });

      const response = await fetch(`/api/search-numbers?${queryParams.toString()}`);
      const data = await response.json();

      if (response.ok) {
        if (data.numbers && data.numbers.length > 0) {

          const mappedNumbers: PhoneNumber[] = data.numbers.map((num: { phoneNumber: string; isoCountry?: string; capabilities?: { voice?: boolean; sms?: boolean; mms?: boolean }; price?: string }) => ({
            phoneNumber: num.phoneNumber,
            isoCountry: num.isoCountry,

            capabilities: {
              voice: num.capabilities?.voice || false,
              sms: num.capabilities?.sms || false,
              mms: num.capabilities?.mms || false
            },
            price: num.price || 'Pricing unavailable'
          }));
          setAvailableNumbers(mappedNumbers);
          setCurrentStep('selectAndBuy');
        } else {
          setSearchError('No numbers found for your criteria.');
        }
      } else {
        setSearchError(data.message || 'Failed to search for numbers');
      }
    } catch (err: unknown) {
      console.error('Search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setSearchError('An unexpected error occurred during search: ' + errorMessage);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleBuy = async () => {
    if (!selectedNumber) {
      setPurchaseMessage('Please select a phone number.');
      return;
    }

    setLoadingPurchase(true);
    setPurchaseMessage('');
    setShowPopup(false);

    try {
      // Fetch from your Next.js API route
      const response = await fetch('/api/buy-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: selectedNumber.phoneNumber,
          friendlyName: friendlyNameInput,
        }),
      });

      const data = await response.json();

        if (response.ok) {
          setPopupMessage(`Successfully purchased!`);
          setPopupPhoneNumber(data.purchasedNumber?.phoneNumber || selectedNumber.phoneNumber); 
          setShowPopup(true);
          setTimeout(() => {
            // Store phone number in localStorage and pass as URL parameter
            const purchasedPhoneNumber = data.purchasedNumber?.phoneNumber || selectedNumber.phoneNumber;
            localStorage.setItem('purchasedPhoneNumber', purchasedPhoneNumber);
            router.push(`/Dashboard?industry=${industry}&phoneNumber=${encodeURIComponent(purchasedPhoneNumber)}`)
          }, 3000);


        setAvailableNumbers([]);
        setSelectedNumber(null);
        setFriendlyNameInput('');
      } else {
        setPurchaseMessage(`Failed to purchase number: ${data.message || 'Unknown error'}`);
      }
    } catch (error: unknown) {
      console.error('Error purchasing number:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setPurchaseMessage('An error occurred while purchasing the number: ' + errorMessage);
    } finally {
      setLoadingPurchase(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto my-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center gap-6 mb-8 mt-2">
        <div className={`w-10 h-1 rounded ${currentStep === 'search' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold ${currentStep === 'search' ? 'bg-blue-600' : 'bg-gray-400'}`}>
            3
          </div>
          <span className={`mt-1 text-sm font-semibold ${currentStep === 'search' ? 'text-blue-600' : 'text-gray-600'}`}>Search</span>
        </div>
        <div className={`w-10 h-1 rounded ${currentStep === 'selectAndBuy' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-full text-white flex items-center justify-center text-lg font-semibold ${currentStep === 'selectAndBuy' ? 'bg-blue-600' : 'bg-gray-400'}`}>
            4
          </div>
          <span className={`mt-1 text-sm font-semibold ${currentStep === 'selectAndBuy' ? 'text-blue-600' : 'text-gray-600'}`}>Select & Buy</span>
        </div>
      </div>

      {currentStep === 'search' && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Twilio Phone Numbers</h2>
          <p className="text-gray-600 mb-6">Find available phone numbers to connect with your AI agent.</p>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
              <select
                id="country"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
              <select
                id="type"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
                value={type}
                onChange={(e) => setType(e.target.value as 'Local' | 'Mobile' | 'TollFree')}
              >
                <option value="Local">Local</option>
                <option value="Mobile">Mobile</option>
                <option value="TollFree">Toll-Free</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="areaCode" className="block text-sm font-medium text-gray-700">Area Code (optional):</label>
              <input
                type="text"
                id="areaCode"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
                placeholder="e.g., 510 for California"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loadingSearch}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${loadingSearch ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loadingSearch ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Search Numbers
              </>
            )}
          </button>

          {searchError && <p className="mt-4 text-center text-sm text-red-600">{searchError}</p>}
        </>
      )}

      {currentStep === 'selectAndBuy' && (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Select a Number to Buy</h2>
          <p className="text-gray-600 mb-6">Choose a phone number to connect with your AI agent.</p>

          {/* Numbers List */}
          <div className="space-y-3 mb-6">
            {availableNumbers.length > 0 ? (
              availableNumbers.map((num: PhoneNumber) => (
                <div
                  key={num.phoneNumber}
                  onClick={() => {
                    setSelectedNumber(num);
                    setFriendlyNameInput('');
                  }}
                  className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition hover:shadow-md ${selectedNumber?.phoneNumber === num.phoneNumber
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                     <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{num.phoneNumber}</span>
                    {num.price && (
                        <span className="text-sm text-green-600 font-semibold">{num.price}</span>
                      )}
                  </div>
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-600">
                    {/* Display Capabilities with icons using optional chaining */}
                    <span className="flex items-center gap-1">
                      Voice: {num.capabilities?.voice ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    </span>
                    <span className="flex items-center gap-1">
                      SMS: {num.capabilities?.sms ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    </span>
                    <span className="flex items-center gap-1">
                      MMS: {num.capabilities?.mms ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No phone numbers available from your search. Please go back and search again.
              </p>
            )}
          </div>

          {/* Friendly Name Input and Buy Button for Selected Number */}
          {selectedNumber && (
            <div className="mt-6 p-4 border rounded-md bg-blue-50 flex flex-col items-start">
              <p className="font-semibold text-gray-800 mb-3">Selected Number: {selectedNumber.phoneNumber}</p>
              <label htmlFor="friendlyName" className="block text-sm font-medium text-gray-700 mb-1">
                Friendly Name (optional):
              </label>
              <input
                type="text"
                id="friendlyName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
                value={friendlyNameInput}
                onChange={(e) => setFriendlyNameInput(e.target.value)}
                placeholder="e.g., My AI Agent Number"
              />
            </div>
          )}


          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentStep('search')}
              className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Search
            </button>

            <button
              onClick={handleBuy}
              disabled={!selectedNumber || loadingPurchase}
              className={`flex items-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${!selectedNumber || loadingPurchase
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
            >
              {loadingPurchase ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buying...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Buy Number
                </>
              )}
            </button>
          </div>

          {purchaseMessage && <p className="mt-4 text-center text-sm text-gray-600">{purchaseMessage}</p>}
        </>
      )}

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Purchase Successful!</h3>
            <p className="text-gray-600 mb-4">
              Phone number **{popupPhoneNumber}** has been successfully purchased.
            </p>
            <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

    </div>
  );
}


