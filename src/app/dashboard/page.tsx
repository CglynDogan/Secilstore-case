'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useGetCollectionsQuery } from '@/store/api/apiSlice'
import { ChartBarIcon, CubeIcon, ShoppingCartIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const stats = [
  {
    name: 'Toplam Koleksiyon',
    value: '21',
    icon: ShoppingCartIcon,
    change: '+4.75%',
    changeType: 'positive',
  },
  {
    name: 'Toplam Ürün',
    value: '644',
    icon: CubeIcon,
    change: '+54.02%',
    changeType: 'positive',
  },
  {
    name: 'Kullanıcılar',
    value: '12',
    icon: UsersIcon,
    change: '+10.18%',
    changeType: 'positive',
  },
]

export default function DashboardPage() {
  const { data: collectionsData, isLoading, error } = useGetCollectionsQuery()

  return (
    <DashboardLayout title="Dashboard" subtitle="Genel bakış ve istatistikler">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="card p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {item.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {item.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          item.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {item.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collections Overview */}
        <div className="card">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Koleksiyonlar
            </h3>
            <div className="mt-5">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-600 dark:text-red-400">
                  Koleksiyonlar yüklenirken hata oluştu
                </div>
              ) : (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Başlık
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Ürün Koşulları
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Satış Kanalı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {collectionsData?.data?.slice(0, 5).map((collection) => (
                        <tr key={collection.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            Koleksiyon - {collection.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {collection.filters?.filters?.length || 0} filtre
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            Satış Kanalı - {collection.id % 3 + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <Link
                              href={`/collections/edit?id=${collection.id}`}
                              className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                            >
                              Sabitleri Düzenle
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingCartIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Koleksiyon Yönetimi
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Koleksiyonları görüntüle ve düzenle
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/collections" className="btn-primary w-full block text-center">
                Koleksiyonlara Git
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CubeIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Ürün Yönetimi
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ürünleri görüntüle ve düzenle
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-secondary w-full">
                Ürünlere Git
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}