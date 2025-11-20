import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getWaitlistSubscribers, getContactForms } from '@/lib/firebase'
import { Lock, Mail, Users, MessageSquare, LogOut } from 'lucide-react'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('waitlist')
  const [waitlistData, setWaitlistData] = useState([])
  const [contactData, setContactData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') {
      setIsAuthenticated(true)
      setError('')
      fetchData()
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    setWaitlistData([])
    setContactData([])
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const waitlistResult = await getWaitlistSubscribers()
      const contactResult = await getContactForms()
      
      if (waitlistResult.success) {
        setWaitlistData(waitlistResult.data)
      }
      if (contactResult.success) {
        setContactData(contactResult.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
        <Card className="w-full max-w-md p-8 sm:p-12">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-center mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your password to access the admin dashboard
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Waitlist Subscribers</p>
                <p className="text-3xl font-bold">{waitlistData.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Forms</p>
                <p className="text-3xl font-bold">{contactData.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`pb-3 px-4 font-medium transition-colors relative ${
              activeTab === 'waitlist'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Waitlist ({waitlistData.length})
            </div>
            {activeTab === 'waitlist' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-3 px-4 font-medium transition-colors relative ${
              activeTab === 'contact'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact Forms ({contactData.length})
            </div>
            {activeTab === 'contact' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {/* Data Display */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            {activeTab === 'waitlist' && (
              <div className="space-y-4">
                {waitlistData.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No waitlist subscribers yet</p>
                  </Card>
                ) : (
                  waitlistData.map((item, index) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                {item.email}
                              </p>
                              {/* <p className="text-sm text-muted-foreground">
                                {formatDate(item.timestamp)}
                              </p> */}
                            </div>
                          </div>
                          {/* {item.source && (
                            <p className="text-sm text-muted-foreground ml-11">
                              Source: {item.source}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                {contactData.length === 0 ? (
                  <Card className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No contact forms submitted yet</p>
                  </Card>
                ) : (
                  contactData.map((item, index) => (
                    <Card key={item.id} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-lg">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(item.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-11 space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Email</p>
                              <p className="text-sm">{item.email}</p>
                            </div>
                            {item.country && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Country</p>
                                <p className="text-sm">{item.country}</p>
                              </div>
                            )}
                            {item.website && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Website</p>
                                <a 
                                  href={item.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                >
                                  {item.website}
                                </a>
                              </div>
                            )}
                            {item.jobFunction && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Job Function</p>
                                <p className="text-sm">{item.jobFunction}</p>
                              </div>
                            )}
                          </div>
                          
                          {item.message && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Message</p>
                              <p className="text-sm bg-muted/50 p-3 rounded-lg">{item.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
